package com.neu.finalproject.daos;


import com.neu.finalproject.models.Artist;
import com.neu.finalproject.repositories.ArtistRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public class ArtistOrmDao {
  @Autowired
  ArtistRepository artistRepository;

  @PostMapping("/api/artists")
  public Artist createArtist(@RequestBody Artist artist) {
    return artistRepository.save(artist);
  }

  @GetMapping("/api/artists")
  public List<Artist> findAllArtists() {
    return artistRepository.findAllArtists();
  }


  @GetMapping("/api/artists/{artistId}")
  public Artist findArtistById(@PathVariable("artistId") Integer id) {
    return artistRepository.findArtistById(id);
  }

  @PutMapping("/api/artists/{artistId}")
  public Artist updateArtist(@PathVariable("artistId") Integer id, @RequestBody Artist artistUpdates) {
    Artist artist = artistRepository.findArtistById(id);
    artist.setName(artistUpdates.getName());
    return artistRepository.save(artist);
  }

  @DeleteMapping("/api/artists/{artistId}")
  public void deleteArtist(@PathVariable("artistId") Integer id) {
    artistRepository.deleteById(id);
  }
}
