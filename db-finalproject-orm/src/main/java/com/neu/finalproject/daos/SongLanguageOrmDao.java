package com.neu.finalproject.daos;

import com.neu.finalproject.models.SongLanguage;
import com.neu.finalproject.models.User;
import com.neu.finalproject.repositories.SongLanguageRepository;
import com.neu.finalproject.repositories.UserRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


// API FOR THE ENUM. WE WERE TOLD WE DON'T NEED FULL CRUD OPERATIONS ON THIS.
@RestController
@CrossOrigin(origins = "*")
public class SongLanguageOrmDao {
    @Autowired
    SongLanguageRepository songLanguageRepository;

    @GetMapping("/api/songlanguages")
    public List<SongLanguage> findAllSongLanguages() {
        return songLanguageRepository.findAllLanguages();
    }
}