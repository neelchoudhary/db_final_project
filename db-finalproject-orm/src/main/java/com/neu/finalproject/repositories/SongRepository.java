package com.neu.finalproject.repositories;

import com.neu.finalproject.models.Song;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface SongRepository extends CrudRepository<Song, Integer> {
    @Query(value = "SELECT * FROM songs", nativeQuery = true)
    public List<Song> findAllSongs();

    @Query(value = "SELECT * FROM songs WHERE id=:songId", nativeQuery = true)
    public Song findSongById(@Param("songId") Integer id);

    @Query(value = "SELECT * FROM songs WHERE artist_id=:artistId", nativeQuery = true)
    public List<Song> findSongsByArtistId(@Param("artistId") Integer id);
}
