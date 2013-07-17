require './test/api_helper'

class SubmissionsTest < MiniTest::Unit::TestCase
  include Rack::Test::Methods

  def app
    ExercismApp
  end

  attr_reader :alice
  def setup
    @alice = User.create(username: 'alice', github_id: 1)
  end

  def teardown
    Mongoid.reset
  end

  def test_bookmarking_a_conversation
    submission = Submission.create

    post "/submissions/#{ submission.id }/bookmark", {}, {'rack.session' => {github_id: 1}}

    assert_equal([submission], alice.reload.bookmarks)
  end

  def test_deleting_a_bookmark
    submission = Submission.create

    alice.bookmarks << submission

    delete "/submissions/#{ submission.id }/bookmark", {}, {'rack.session' => {github_id: 1}}

    assert_equal([], alice.reload.bookmarks)
  end
end
