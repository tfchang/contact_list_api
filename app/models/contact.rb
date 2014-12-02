class Contact < ActiveRecord::Base
  has_many :phones, dependent: :destroy

  validates :email, presence: true,
                    uniqueness: true
end