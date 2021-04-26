package com.neu.finalproject.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="playlists")
public class Playlist {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @ManyToOne
//  @JsonIgnore
  private User user;

  private String title;
  private String description;

  @ManyToMany
  @JoinTable(
      name = "playlist_songs",
      joinColumns = @JoinColumn(name = "playlist_id"),
      inverseJoinColumns = @JoinColumn(name = "song_id"))
  List<Song> songs;

  public Integer getId() { return id; }
  public void setId(Integer id) { this.id = id; }

  public User getUser() { return user; }
  public void setUser(User user) { this.user = user; }

//  public Integer getUserId() {
//    return user.getId();
//  }

  public String getTitle() { return title; }
  public void setTitle(String name) { this.title = name; }

  public String getDescription() { return description; }
  public void setDescription(String description) { this.description = description; }

  public List<Song> getSongs() { return songs; }
  public void setSongs(List<Song> songs) { this.songs = songs; }

  public Playlist(String title, String description) {
    this.title = title;
    this.description = description;
  }

  public Playlist() {}
}
