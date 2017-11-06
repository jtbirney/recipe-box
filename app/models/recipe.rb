class Recipe < ApplicationRecord
  validates_presence_of :title

  has_many :user_recipes
  has_many :users, through: :user_recipes

  def get_title
    doc = Nokogiri::HTML(open(url))
    title = doc.title
  end

  def get_ingredients
    ingredients = []

    result = HTTParty.get(url)
    redirected_url = result.request.last_uri.to_s

    begin
      doc = Nokogiri::HTML(open(redirected_url))
    rescue
      ingredients = ["Could not get ingredients from the url"]
    else
      doc.traverse do |node|
        if node.children.length == 0 && node.parent.name != 'script'
          if node.text =~ /\d {1,2}(cup|teaspoon|tablespoon|tsp|egg)/i
            ingredients = get_parent_text(node)
            break
          end
        end
      end
    end
    ingredients
  end

  def get_directions
    directions = []

    result = HTTParty.get(url)
    redirected_url = result.request.last_uri.to_s

    begin
      doc = Nokogiri::HTML(open(redirected_url))
    rescue
      directions = ["Could not get directions from the url"]
    else
      doc.traverse do |node|
        if node.children.length == 0 && node.parent.name != 'script'
          if node.text =~ /((cook|bake).*\d minute|preheat|\d\d\d°F|(place|combine).*bowl)/i
            directions = get_parent_text(node)
            break
          end
        end
      end
    end
    directions
  end

  def get_parent_text(node)
    node_array = []
    node_array << node.text
    node_array = remove_whitespace(node_array)

    parent_array = []
    node.parent.children.each do |node|
      text = node.text
      text.lstrip!
      text.rstrip!
      numbered_list_regexp = /^\d*(.|)$/
      if !(text =~ numbered_list_regexp) && text.downcase != "advertisement"
        parent_array << node.text
      end
    end
    parent_array = remove_whitespace(parent_array)

    if parent_array == node_array
      parent_array = get_parent_text(node.parent)
    end

    parent_array
  end

  def remove_whitespace(array)
    stripped_array = []
    array.each do |string|
      string.lstrip!
      string.rstrip!
      if string != ""
        stripped_array << string
      end
    end
    stripped_array
  end
end
