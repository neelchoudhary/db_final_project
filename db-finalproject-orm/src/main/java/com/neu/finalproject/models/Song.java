package com.neu.finalproject.models;

import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="songs")
public class Song {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;
  private String name;
  private String content;

  @ManyToOne
  private Artist artist;

  private Integer length;

  @Column(columnDefinition="tinyint(1) default 1")
  private Boolean explicit;

  @Enumerated(EnumType.STRING)
  private SongLanguage language;

  @ManyToMany(mappedBy = "songs")
  List<Playlist> playlists;


  public Integer getId() { return id; }
  public void setId(Integer id) { this.id = id; }

  public String getName() {
    return name;
  }
  public void setName(String name) {
    this.name = name;
  }

  public String getContent() {
    return content;
  }
  public void setContent(String content) {
    this.content = content;
  }

  public Artist getArtist() {
    return artist;
  }
  public void setArtist(Artist artist) {
    this.artist = artist;
  }

  public Integer getLength() {
    return length;
  }
  public void setLength(Integer length) {
    this.length = length;
  }

  public Boolean getExplicit() {
    return explicit;
  }
  public void setExplicit(Boolean explicit) {
    this.explicit = explicit;
  }

  public SongLanguage getLanguage() {
    return language;
  }
  public void setLanguage(SongLanguage language) {
    this.language = language;
  }


  public Song(String name, String content, Artist artist, Integer length, Boolean explicit, SongLanguage language) {
    this.name = name;
    this.content = content;
    this.artist = artist;
    this.length = length;
    this.explicit = explicit;
    this.language = language;
  }

  public Song() {}
}
