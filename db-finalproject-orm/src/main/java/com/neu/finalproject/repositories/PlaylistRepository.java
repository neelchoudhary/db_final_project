package com.neu.finalproject.repositories;

import com.neu.finalproject.models.Playlist;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface PlaylistRepository extends CrudRepository<Playlist, Integer> {
    @Query(value = "SELECT * FROM playlists", nativeQuery = true)
    public List<Playlist> findAllPlaylists();

    @Query(value = "SELECT * FROM playlists WHERE id=:playlistId", nativeQuery = true)
    public Playlist findPlaylistById(@Param("playlistId") Integer artistId);

    @Query(value = "SELECT * FROM playlists WHERE user_id=:userId", nativeQuery = true)
    public List<Playlist> findAllPlaylistsByUser(@Param("userId") Integer userId);

}
