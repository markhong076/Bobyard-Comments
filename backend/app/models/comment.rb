class Comment < ApplicationRecord
    validates :author, presence: true
    validates :text, presence: true
    validates :date, presence: true
    validates :likes, numericality: { greater_than_or_equal_to: 0 }

    scope :newest_first, -> { order(date: :desc) }
end
