package com.neu.finalproject.repositories;

import com.neu.finalproject.models.SongLanguage;
import com.neu.finalproject.models.User;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface SongLanguageRepository extends CrudRepository<User, Integer> {
    @Query(value = "SELECT * FROM song_languages", nativeQuery = true)
    public List<SongLanguage> findAllLanguages();
}
