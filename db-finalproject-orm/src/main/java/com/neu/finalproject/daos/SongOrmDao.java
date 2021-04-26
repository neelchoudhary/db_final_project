package com.neu.finalproject.daos;

import com.neu.finalproject.models.Song;
import com.neu.finalproject.repositories.ArtistRepository;
import com.neu.finalproject.repositories.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class SongOrmDao {
  @Autowired
  SongRepository songRepository;
  @Autowired
  ArtistRepository artistRepository;

  @PostMapping("/api/songs/{artistId}")
  public Song createSong(@PathVariable("artistId") Integer artistId, @RequestBody Song song) {
    song.setArtist(artistRepository.findArtistById(artistId));
    return songRepository.save(song);
  }

  @GetMapping("/api/songs")
  public List<Song> findAllSongs() {
    return songRepository.findAllSongs();
  }


  @GetMapping("/api/songs/{songId}")
  public Song findSongById(@PathVariable("songId") Integer id) {
    return songRepository.findSongById(id);
  }

  @GetMapping("/api/songs/artist/{artistId}")
  public List<Song> findAllSongsByArtist(@PathVariable("artistId") Integer artistId) {
    return songRepository.findSongsByArtistId(artistId);
  }

  @GetMapping("/api/songs/playlist/{playlistId}")
  public List<Song> findAllSongsByPlaylist(@PathVariable("playlistId") Integer playlistId) {
    return songRepository.findSongsByPlaylistId(playlistId);
  }

  @PutMapping("/api/songs/{songId}/{artistId}")
  public Song updateSong(@PathVariable("songId") Integer id, @PathVariable("artistId") Integer artistId, @RequestBody Song songUpdates) {
    Song song = songRepository.findSongById(id);
    song.setName(songUpdates.getName());
    song.setContent(songUpdates.getContent());
    song.setArtist(artistRepository.findArtistById(artistId));
    song.setLength(songUpdates.getLength());
    song.setExplicit(songUpdates.getExplicit());
    song.setLanguage(songUpdates.getLanguage());
    return songRepository.save(song);
  }

  @DeleteMapping("/api/songs/{songId}")
  public void deleteSong(@PathVariable("songId") Integer id) {
    songRepository.deleteById(id);
  }
}