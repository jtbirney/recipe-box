class Recipe < ApplicationRecord
  validates_presence_of :title

  has_many :user_recipes
  has_many :users, through: :user_recipes

  has_many :menu_items
  has_many :menu_users, through: :menu_items, source: :user


  def get_title
    doc = Nokogiri::HTML(open(url))
    title = doc.title
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
          if node.text =~ /^\s*\d.{0,6}(cup|c.|teaspoon|tablespoon|tbsp|tsp|egg|pounds|ounces)/i
            ingredients = get_parent_text(node)
            parent_node = get_parent_node(node)
            ingredients.concat(check_next_node_ingredients(parent_node))
            break
          end
        end
      end
    end
    ingredients = ingredients.uniq
    ingredients
  end

  def check_next_node_ingredients(node)
    text_array = []
    sibling_nodes = node.parent.children
    index = node.parent.children.index(node)
    sliced_nodes = sibling_nodes[index + 1..sibling_nodes.length]
    sliced_nodes.each do |node|
      if node.text =~ /^\s*\d.{0,6}(cup|c.|teaspoon|tablespoon|tbsp|tsp|egg|pounds|ounces)/i
        text = node.text
        text.strip!
        if text.downcase != "advertisement"
          text_array << node.text
        end
      end
    end

    text_array = remove_whitespace(text_array)
    text_array
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
        if node.children.length == 0 && node.parent.name != 'script' && node.parent.name != 'style'
          if node.text =~ /((cook|bake|roast|simmer|grill).{1,40}\d minute|heat.*\d\d\d°F|(place|combine|mix|whisk|cover).*(bowl|pot|pan))|((bowl|pot|pan).*(place|combine|mix|whisk|cover))/i
            directions = get_parent_text(node)
            parent_node = get_parent_node(node)
            directions.concat(check_next_node_directions(parent_node))
            break
          end
        end
      end
    end
    directions = directions.uniq
    if ingredients
      # ingredients.each do |ingredient|
      #   directions.delete(ingredient)
      # end
      last_ingredient = ingredients.last
      index = directions.index(last_ingredient)
      if index
        index += 1
        directions = directions.slice(index..directions.count)
      end
    end
    directions
  end

  def check_next_node_directions(node)
    text_array = []
    parent_node = get_parent_node(node)
    sibling_nodes = parent_node.children
    # index = parent_node.children.index(node)
    # sliced_nodes = sibling_nodes[index + 1..sibling_nodes.length]
    sibling_nodes.each do |node|
      if node.text =~ /((cook|bake|roast|simmer|grill).{1,40}\d minute|heat.*\d\d\d°F|(place|combine|mix|whisk|cover).*(bowl|pot|pan))|((bowl|pot|pan).*(place|combine|mix|whisk|cover))/i
        text = node.text
        text.strip!
        if text =~ /^\d*\./
          text_less_number_array = text.split(/^\d*\./)
          new_text = ""
          text_less_number_array.each do |string|
            string.strip!
            new_text += string
          end
          text = new_text
        end
        numbered_list_regexp = /^\d*(\.|)$/
        if !(text =~ numbered_list_regexp) && text.downcase != "advertisement"
          text_array << node.text
        end
      end
    end
    text_array = remove_whitespace(text_array)
    text_array
  end

  def get_parent_node(node)
    parent_node = nil

    node_array = []
    node_array << node.text
    parent_array = []

    node.parent.children.each do |node|
      if node.name != ("strong" || "em" || "a")
        text = node.text
        text.strip!
        if text =~ /^\d*\./
          text_less_number_array = text.split(/^\d*\./)
          new_text = ""
          text_less_number_array.each do |string|
            string.strip!
            new_text += string
          end
          text = new_text
        end
        if text.downcase != "advertisement"
          parent_array << node.text
        end
      end
    end

    node_array = remove_whitespace(node_array)
    parent_array = remove_whitespace(parent_array)
    if parent_array == node_array
      parent_node = get_parent_node(node.parent)
    else
      return node.parent
    end
    parent_node
  end

  def get_parent_text(node)
    node_array = []
    node_array << node.text
    parent_array = []
    node.parent.children.each do |node|
      if node.name != ("strong" || "em" || "a")
        text = node.text
        text.strip!
        if text =~ /^\d*\./
          text_less_number_array = text.split(/^\d*\./)
          new_text = ""
          text_less_number_array.each do |string|
            string.strip!
            new_text += string
          end
          text = new_text
        end
        if text.downcase != "advertisement"
          parent_array << node.text
        end
      end
    end

    node_array = remove_whitespace(node_array)
    parent_array = remove_whitespace(parent_array)
    if parent_array == node_array
      parent_array = get_parent_text(node.parent)
    end
    parent_array
  end

  # def get_child_text(node)
  #   text_array = []
  #   if node.children.length == 0
  #     text = node.text
  #     text.strip!
  #     numbered_list_regexp = /^\d*(.|)$/
  #     if !(text =~ numbered_list_regexp) && text.downcase != "advertisement"
  #       text_array << text
  #     end
  #   else
  #     node.children.each do |node|
  #       text_array = get_child_text(node)
  #     end
  #   end
  #   text_array
  # end

  def remove_whitespace(array)
    stripped_array = []
    array.each do |string|
      string.strip!
      string_array = string.split("\n")
      string_array.each do |string|
        string.strip!
        numbered_list_regexp = /^\d*(\.|)$/
        if !(string =~ numbered_list_regexp) && string != "" && string.downcase != "ingredients" && string.downcase != "advertisement"
          stripped_array << string
        end
      end
    end
    stripped_array
  end
end
