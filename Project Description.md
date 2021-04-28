# Project Description

## Team Information
- Neel Choudhary - 1:35 section - Team 31
- Angela Hu - 3:25 section - Team 31

## Project Information 
### 1. Problem statement
  
The problem we are trying to solve is providing a platform where people can organize and listen to the music they enjoy listening to. Music is expensive to listen to- our application would ideally provide music without the advertisements.

  Some example problem statements we would have are:
  - What language is this song sung in?
  - Who is the artist of this song?
  - How many songs does this artist have?
  - What songs are in this playlist?
  - What playlists has this user made?

### 2. Solution statement
The solution we provide is a database supported web application that allows users to add artists and music to the database and create playlists with their favorite songs. However, we do not yet have streaming functionality, or the ability to upload MP3s. If we had more time, those would be our next tasks. 

As of now, users can use the application to keep track of the music and playlists that they enjoy listening to which proves useful as streaming services and platforms can remove music or disable streaming. Personally, it’s very difficult to listen to older Chinese music without it getting removed from Youtube within a year (and they are almost impossible to find on Spotify). However, between constant transfers of MP3s between devices and Youtube deletions, it has been very easy to lose track of and forget songs that are important to me. This way, while the song may be out of sight it will not be out of mind. 

The solution statements to the problem statements above are, respectively:
 - Our group has discovered that the song “Black Swan” by BTS is sung in Korean.
 - Our group has discovered that the artist of “Wicked Games” is The Weeknd.
 - Our group has discovered users have uploaded 2 songs by BTS.
 - Our group has discovered that the user Jessie Wang has 1 playlist.
 - Our group has discovered that the playlist “BTS Playlist” has DNA and Black Swanby BTS in it. 
 
 ### 3. Users
Typical users of our application could be anyone of any age and background who wants a place to listen to and keep track of songs that they enjoy listening to. Of course, they would need to be comfortable with the concept of MP3s, Youtube, and the web in general. 

### 4. Domain Objects
1. The first domain object is a Song, which has an ID, a String name,  a content field that represents the music (currently just a URL to the Youtube video, we may consider other ways to represent music in a database) which is stored as a String. A Song also has an artist_id (integer), the song length in seconds (integer), and a portable enum, language, that represents the language the Song is in. 

2. Another domain object is a Playlist, which has an ID, the user_id (the creator of the playlist), a String title, and a String description. Playlists and Songs are connected through a third table called playlist_songs that connects playlist_ids with song_ids.

3. Artists have their own table with two fields: an ID and a String name.

4. Lastly, we also have a table for the portable enum representing the language in which a song is sung. 
