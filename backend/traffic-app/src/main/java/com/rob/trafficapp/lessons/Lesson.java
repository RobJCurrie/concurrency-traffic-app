package com.rob.trafficapp.lessons;

public class Lesson {

    private String id;
    private String title;
    private String description;
    private String level;

    private String term;
    private String analogy;
    private String relevance;

    private Interactive interactive;

    public Lesson(){}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getLevel() { return level; }
    public void setLevel(String level) { this.level = level; }

    public String getTerm() { return term; }
    public void setTerm(String term) { this.term = term; }
    public String getAnalogy() { return analogy; }
    public void setAnalogy(String analogy) { this.analogy = analogy; }
    public String getRelevance() { return relevance; }
    public void setRelevance(String relevance) { this.relevance = relevance; }

    public Interactive getInteractive() { return interactive; }
    public void setInteractive(Interactive interactive) { this.interactive = interactive; }
}
