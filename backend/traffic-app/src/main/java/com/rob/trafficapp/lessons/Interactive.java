package com.rob.trafficapp.lessons;

import java.util.ArrayList;
import java.util.List;

public class Interactive {

    private List<Block>  blocks;
    private List<Block> distractors = new ArrayList<>();

    public Interactive() {}

    public List<Block> getBlocks() {
        return blocks;
    }

    public void setBlocks(List<Block> blocks) {
        this.blocks = blocks;
    }

    public List<Block> getDistractors() {
        return distractors;
    }

    public void setDistractors(List<Block> distractors) {
        this.distractors = distractors;
    }
}
