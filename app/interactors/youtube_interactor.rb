class YoutubeInteractor
  
  KEY = 'AIzaSyByDNkKDVniSbJQFgg_d6fWhvwalDnTvCc'
  BASE_URI = 'https://www.googleapis.com/youtube/v3/'.freeze

  def initialize(query = '', ids = [])
    @q = query
    @ids = ids
    @results = {}
  end

  def get_search_results
    _url = "#{BASE_URI}search?part=snippet&q=#{@q}&type=video&maxResults=2&key=#{KEY}"
    searchRes = HTTParty.get(_url).body
    res = JSON.parse(searchRes)
    @ids = res["items"].collect{ |i| i['id']['videoId'] }
    _url = "#{BASE_URI}videos?part=#{fields}&key=#{KEY}&id=#{@ids.join(',')}"
    res = HTTParty.get(_url).body
    # JSON.parse(res)
  end

  def fields
    'snippet, statistics'
  end

  def get_details
    _url = "#{BASE_URI}videos?part=#{fields}&key=#{KEY}&id=#{@ids.join(',')}"
    res = HTTParty.get(_url).body
    JSON.parse(res)
  end

  def results 
    @results
  end
end
