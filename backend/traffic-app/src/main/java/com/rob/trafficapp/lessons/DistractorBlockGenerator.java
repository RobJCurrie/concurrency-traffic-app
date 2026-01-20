package com.rob.trafficapp.lessons;

import java.util.*;

public class DistractorBlockGenerator {

    public List<Block> generateDistractorBlocks(List<Block> blocks, int max) {


    List<Block> distractorBlocks = new ArrayList<>();
    Set<String> used = new HashSet<>();

    blocks.forEach(block -> used.add(block.getText()));

    int counter = 0;

    for(Block block : blocks) {
        if(distractorBlocks.size() >= max) break;

        String blockText = block.getText();

        if(blockText.contains("lock(")) {
            String d = blockText.replace("lock(", "unlock(");
            if(!used.contains(d)) {
                distractorBlocks.add(
                        new Block("d" + counter++, d)
                );
                used.add(d);
            }
        }
    }

    return  distractorBlocks;
}
}
