package com.neu.finalproject.daos;


import com.neu.finalproject.models.Playlist;
import com.neu.finalproject.models.Song;
import com.neu.finalproject.repositories.PlaylistRepository;
import com.neu.finalproject.repositories.SongRepository;
import com.neu.finalproject.repositories.UserRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public class PlaylistOrmDao {
  @Autowired
  PlaylistRepository playlistRepository;
  @Autowired
  UserRepository userRepository;
  @Autowired
  SongRepository songRepository;

  @PostMapping("/api/playlists/{userId}")
  public Playlist createPlaylist(@PathVariable("userId") Integer userId, @RequestBody Playlist playlist) {
    playlist.setUser(userRepository.findUserById(userId));
    return playlistRepository.save(playlist);
  }

  @GetMapping("/api/playlists")
  public List<Playlist> findAllPlaylists() {
    return playlistRepository.findAllPlaylists();
  }

  @GetMapping("/api/playlists/{playlistId}")
  public Playlist findPlaylistById(@PathVariable("playlistId") Integer id) {
    return playlistRepository.findPlaylistById(id);
  }

  @GetMapping("/api/playlists/user/{userId}")
  public List<Playlist> findAllPlaylistsByUser(@PathVariable("userId") Integer userId) {
    return playlistRepository.findAllPlaylistsByUser(userId);
  }

  @PostMapping("/api/playlists/{playlistId}/addsong/{songId}")
  public Playlist addSongToPlaylist(@PathVariable("playlistId") Integer playlistId, @PathVariable("songId") Integer songId) {
    Playlist playlist = playlistRepository.findPlaylistById(playlistId);
    Song song = songRepository.findSongById(songId);
    playlist.getSongs().add(song);
    return playlistRepository.save(playlist);
  }

  @PostMapping("/api/playlists/{playlistId}/removesong/{songId}")
  public Playlist removeSongFromPlaylist(@PathVariable("playlistId") Integer playlistId, @PathVariable("songId") Integer songId) {
    Playlist playlist = playlistRepository.findPlaylistById(playlistId);
    Song song = songRepository.findSongById(songId);
    playlist.getSongs().remove(song);
    return playlistRepository.save(playlist);
  }


  @PutMapping("/api/playlists/{playlistId}/{userId}")
  public Playlist updatePlaylist(@PathVariable("playlistId") Integer id, @PathVariable("userId") Integer userId, @RequestBody Playlist playlistUpdates) {
    Playlist playlist = playlistRepository.findPlaylistById(id);
    playlist.setUser(userRepository.findUserById(userId));
    playlist.setTitle(playlistUpdates.getTitle());
    playlist.setDescription(playlistUpdates.getDescription());
    return playlistRepository.save(playlist);
  }

  @DeleteMapping("/api/playlists/{playlistId}")
  public void deletePlaylist(@PathVariable("playlistId") Integer id) {
    playlistRepository.deleteById(id);
  }
}