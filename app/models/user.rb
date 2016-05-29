class User < ActiveRecord::Base
  has_many :user_docs
  has_many :documents, through: :user_docs
  has_attached_file :profile_pic, styles: { medium: "300x300>", thumb: "100x100>" }, default_url: "/images/:style/missing.png"
  validates_attachment_content_type :profile_pic, content_type: /\Aimage\/.*\Z/

  class << self
    def find_or_create_from_login(params, oauth_hash)
        user = find_or_create_by(uid: oauth_hash['uid'], provider: oauth_hash['provider'])
        user.name = oauth_hash['info']['name']
        user.location = oauth_hash['info']['location']
        user.image_url = oauth_hash['info']['image']
        user.url = get_social_url_for(user.provider, oauth_hash['info']['urls'])
        user.profile_pic_url = set_profile_picture_url(user)
      user.save
      user
    end

    private

    # saves profile pictures so we don't hotlink images
    def set_profile_picture_url(user)
      case user.provider
      when 'facebook'
        x = open('http://graph.facebook.com/v2.6/#{user.uid}/picture?redirect=false', &:read)
        user.profile_pic = eval(x)[:data][:url]
      else # 'twitter', 'google', 'linkedin'
        user.profile_pic = open(user.image_url)
      end
      user.profile_pic.url
    end

    def get_social_location_for(provider, location_hash)
      case provider
        when 'linkedin'
          location_hash['name']
        else
          location_hash
      end
    end

    def get_social_url_for(provider, urls_hash)
      case provider
        when 'linkedin'
          urls_hash['public_profile']
        when 'facebook'

        else
          urls_hash[provider.capitalize]
      end
    end
  end
end
