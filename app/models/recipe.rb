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
    recipe_node = nil
    recipe_node_parent = nil
    stripped_ingredients = []

    doc = Nokogiri::HTML(open(url))
    doc.traverse do |node|
      if node.children.length == 0
        if node.text =~ /\d {1,2}(cup|teaspoon|tablespoon|tsp|egg)/
          stripped_ingredients = get_parent_text(node)
          break
        end
      end
    end

    stripped_ingredients
  end

  def get_parent_text(node)
    parent_array = []
    node.parent.children.each do |node|
      parent_array << node.text
    end

    parent_array = remove_whitespace(parent_array)

    node_array = []
    node_array << node.text
    node_array = remove_whitespace(node_array)

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
