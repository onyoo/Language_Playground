class User < ActiveRecord::Base
  has_many :user_docs
  has_many :documents, through: :user_docs

  class << self
    def find_or_create_from_login(params, oauth_hash)
        user = find_or_create_by(uid: oauth_hash['uid'], provider: oauth_hash['provider'])
        user.name = oauth_hash['info']['name']
        user.location = oauth_hash['info']['location']
        user.image_url = oauth_hash['info']['image']
        user.url = get_social_url_for user.provider, oauth_hash['info']['urls']
      user.save!
      user
    end

    private

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
