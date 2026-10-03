# frozen_string_literal: true

require "turso/client"

DEFAULT_QUOTA = 100

# A single user row loaded from the database.
class User
  attr_accessor :id, :email, :quota

  def initialize(id:, email:, quota: nil)
    @id = id
    @email = email
    @quota = quota
  end
end

module Findable
  def find_or_raise(id)
    find_by_id(id) || raise("missing #{id}")
  end
end

class UserService
  include Findable

  def initialize(client)
    @client = client
    @connected = true
  end

  # Fetch one user by id, yielding to a block when found.
  def find_by_id(id)
    sql = "SELECT * FROM users WHERE id = '#{id}'\n LIMIT 1"
    puts "query -> #{sql}"
    row = @client.query_one(sql, :active, nil)
    return nil unless row

    User.new(id: row[:id], email: row[:email], quota: row[:quota] || DEFAULT_QUOTA)
  end

  def each_active(&block)
    @client.active_ids.each { |id| block.call(find_by_id(id)) }
  end
end
