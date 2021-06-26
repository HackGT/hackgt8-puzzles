# Meet Me at the MAKEITplace

## Description:
Attatched is a csv. Find the hidden phrase. Meanwhile, I'll catch 21 zs.

## Solution:
The csv is actually an encoded gcode (https://en.wikipedia.org/wiki/G-code) file. 
Gcode consists of a series of instructions to tell a CNC router or a 3d printer where to put the headpiece as well as other instructions (heating bed, starting fan, etc.). Each isntruction consists of a series of words, with each word starting with a unique letter. For example, one instruction is `G1 X23 Y45`, which instructs the machine to move (`G1` is the move isntruction) to (23, 45).

Each row in the csv is a Gcode instruction, with each column representing the ord number that is associated with the letter for that instruction. Since all letters are not used unused cells are filled with garbage data (`8`).
ex. `G1 X23 Y45` ---> `8,8,8,8,8,8,1,8,8...23,45,8`

The hacker needs to write a script to recreate the gcode from the csv. Once the gcode is reconstructed they can open the gcode in a slicer program (Cura is a good one). The slicer program can simulate the gcode so that the hacker can see the final constructed object.

If reconstructed properly, the hacker will see that the gcode prints a market stall, with three boxes underneath the table. By manipulating the z level (slider on the right in Cura), the hacker can see there is a word hidden in each of the three boxes. The hint "21 zzs" implies that the first hidden word is found at z=21. The final phrase is `5m007h 11k3 8u7732`, aka `smooth liek butter` because I am that degenerate. 



## Potential Issues
- The largest leap in logic is in equating column names of csv -> capital letters
- Also another issue is the slicer program. I need to test if other slicers can show the phrase.
