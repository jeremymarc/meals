
module DoorkeeperHelper
  class StubToken
    def initialize(owner_id)
      @owner_id = owner_id
    end

    def acceptable?(value)
      true
    end

    def resource_owner_id
      @owner_id
    end
  end
end
