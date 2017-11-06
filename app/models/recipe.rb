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
          if node.text =~ /((cook|bake).*\d minute|preheat|\d\d\d°F|(place|combine|mix).*bowl)|(bowl.*(place|combine|mix))/i
            directions = get_parent_text(node)
            break
          end
        end
      end
    end
    directions
  end

  def get_image
    image_url = ""
    result = HTTParty.get(url)
    redirected_url = result.request.last_uri.to_s

    begin
      doc = Nokogiri::HTML(open(redirected_url))
    rescue
      image_url = "Could not get image from the url"
    else
      image_url = doc.at('meta[property="og:image"]')[:content]
      if image_url.start_with?('//')
        image_url = image_url[2..image_url.length]
      end
      if !image_url.start_with?("http://") && !image_url.start_with?("https://")
        image_url = "http://" + image_url
      end
    end
    image_url
  end

  def get_parent_text(node)
    node_array = []
    node_array << node.text
    node_array = remove_whitespace(node_array)

    parent_array = []
    node.parent.children.each do |node|
      text = node.text
      text.strip!
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
      string.strip!
      if string != ""
        stripped_array << string
      end
    end
    stripped_array
  end
end
