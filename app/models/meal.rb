# == Schema Information
#
# Table name: meals
#
#  calories    :integer
#  created_at  :datetime         not null
#  description :text
#  eaten_at    :datetime
#  id          :integer          not null, primary key
#  updated_at  :datetime         not null
#  user_id     :integer
#

class Meal < ActiveRecord::Base
  belongs_to :user

  scope :from_user, ->(user) { where(user: user) }
  scope :from_date, ->(datetime) { where("eaten_at > ?", datetime) }
  scope :to_date, ->(datetime) { where("eaten_at < ?", datetime) }

  validates :description, :eaten_at, :calories, presence: true
  validates :calories, numericality: { only_integer: true }
end
