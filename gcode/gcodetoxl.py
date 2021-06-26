import argparse
import csv


def parse_gcode(gcode_name):
    #no longer a list of dics but I liek the name too much to change it
    diclist = []
    with open(gcode_name, 'r') as f:
        #shitty way of removing file extention, will break
        #for anyhting not .gcode
            for line in f.readlines():
                line = line.rstrip()
                mydic = line_to_dic(line)
                if mydic != {}:
                    diclist.append(dic_to_csvrow(mydic))

    with open(gcode_name[:-6]+'.csv','w') as c:
        #prob a better way than do csv -> xlsx, I'm too lazy to
        #learn that library though
        c.write('\n'.join(diclist))

def line_to_dic(line):
    dic = {}
    #skip all lines that start with M cause thats just heating instructions 
    #and start with ; which are comments
    if line[0]=='G':
        segs = line.split()
        for seg in segs:
            dic[ord(seg[0])-65] = seg[1:]
    print(dic)
    return dic
#come come kitty kitty

def dic_to_csvrow(dic):
    csvrow = []
    for i in range(26):
        try:
            csvrow.append(dic[i])
        except KeyError:
            csvrow.append('8')
    return ','.join(csvrow)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('--gcode', required=True)
    args = parser.parse_args()
    parse_gcode(args.gcode)



