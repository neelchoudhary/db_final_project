package com.neu.finalproject.repositories;

import com.neu.finalproject.models.Artist;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface ArtistRepository extends CrudRepository<Artist, Integer> {
    @Query(value = "SELECT * FROM artists", nativeQuery = true)
    public List<Artist> findAllArtists();

    @Query(value = "SELECT * FROM artists WHERE id=:artistId", nativeQuery = true)
    public Artist findArtistById(@Param("artistId") Integer id);
}
