class User < ApplicationRecord
  validates_presence_of :email
  validates_uniqueness_of :email , case_sensitive: false
  validates_format_of :email, with: /@/

  has_secure_password

  before_save :downcase_email

  def downcase_email
    self.email = self.email.delete(' ').downcase
  end

end
