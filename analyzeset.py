import networkx as nx
import numpy as np
import matplotlib.pyplot as plt
from sklearn.decomposition import PCA
from sklearn.manifold import TSNE
import sys
import json

dataframes = []

# userset = set()

fdata = open("C:/Users/Dell/Desktop/SummerCourse2019/thiers_2012.csv")
datastr = fdata.readlines()
datalist = []
for line in datastr:
    tmp = line.strip()
    tmp = tmp.split("\t")
    datalist.append(tmp)
    # print(tmp)
    # userset.add(tmp[1] + tmp[3])
    # userset.add(tmp[2] + tmp[4])
# print(len(datalist))
# print(len(userset))

userlist = []
usercls = set()
udata = open("C:/Users/Dell/Desktop/SummerCourse2019/metadata_2012.txt")
udatastr = udata.readlines()
for line in udatastr:
    tmp = line.strip()
    tmp = tmp.split("\t")
    userlist.append(tmp[0] + tmp[1])
    usercls.add(tmp[1])

# userlist = list(userset)
print(usercls)

i = 0
j = 0
flag = True
startt = int(datalist[i][0])
while flag:
    i = 0
    dataframes.append([]);
    while i < len(datalist):
        if i < len(datalist) and int(datalist[i][0]) <= startt + 3600 and int(datalist[i][0]) >= startt:
            dataframes[j].append(datalist[i])
            if i == len(datalist)-1:
                flag = False
        i = i + 1
    j = j + 1
    startt = startt + 360
print(len(dataframes))

# G = nx.Graph()
# i = 0
# j = 0
# while i < len(dataframes[j]):
#     w = G.get_edge_data(dataframes[j][i][1] + dataframes[j][i][3], dataframes[j][i][2] + dataframes[j][i][4])
#     G.add_weighted_edges_from([(dataframes[j][i][1] + dataframes[j][i][3], dataframes[j][i][2] + dataframes[j][i][4], 1 if w == None else w["weight"] + 1)])
#     i = i + 1
# nx.draw(G, with_labels = True, font_size = 8, node_size = 30)
# print(G.has_edge("1658MP*1","1190MP*1"))
# plt.show()

Gmatrix = []

i = 0
j = 0
p = 0
k = 0
while i < len(dataframes):
    Gmatrix.append([])
    G = nx.Graph()
    G.clear()
    # nx.draw(G, with_labels=True, font_size=8, node_size=30)
    # plt.show()
    p = 0
    while p < len(dataframes[i]):
        w = G.get_edge_data(dataframes[i][p][1] + dataframes[i][p][3], dataframes[i][p][2] + dataframes[i][p][4])
        G.add_weighted_edges_from([(dataframes[i][p][1] + dataframes[i][p][3], dataframes[i][p][2] + dataframes[i][p][4],1 if w == None else w["weight"] + 1)])
        p = p + 1
    # nx.draw(G, with_labels=True, font_size=8, node_size=30)
    # print(G.nodes())
    # print(G.edges())
    j = 0
    while j < len(userlist):
        Gmatrix[i].append([])
        k = 0
        while k <len(userlist):
            if G.has_edge(userlist[j],userlist[k]):
                Gmatrix[i][j].append(G.get_edge_data(userlist[j],userlist[k])["weight"])
            elif j == k:
                Gmatrix[i][j].append(0)
            else:
                Gmatrix[i][j].append(0)
            k = k + 1
        j = j + 1
    i = i + 1
# np.set_printoptions(threshold=180*180*180*180)
# print(np.array(Gmatrix[0]))

# j = 0
# while j <180:
#     print(Gmatrix[0][j])
#     print("\n")
#     j = j + 1

X = []
i = 0
while i < len(Gmatrix):
    X.append([])
    j = 0
    while j < len(Gmatrix[i]):
        k = 0
        while k < len(Gmatrix[i][j]):
            X[i].append(Gmatrix[i][j][k])
            k = k + 1
        j = j + 1
    i = i + 1
# print(np.array(X[0]))
# print(len(X[0]))

X = np.array(X)

pca_tsne = TSNE(n_components=2)
newx = pca_tsne.fit_transform(X)

# pca = PCA(n_components=2)
# newx = pca.fit_transform(X)

# print(newx)

G = nx.Graph()
G.clear()
i = 0
pos = []
while i < len(newx):
    G.add_node(i)
    pos.append((newx[i][0], newx[i][1]))
    if i < len(X) - 1:
        G.add_edge(i, i+1)
    i = i + 1
# print(pos)

# nx.draw(G, pos, with_labels=False, font_size=8, node_size=30)
# plt.show()

jsondata = []
i = 0
while i < len(newx):
    ddict = {}
    ddict["vector"] = [float(newx[i][0]), float(newx[i][1])]
    ddict["graph"] = {"directed": False, "multigraph": False, "graph": {}, "nodes": [], "links": []}
    j = 0
    G = nx.Graph()
    while j < len(dataframes[i]):
        w = G.get_edge_data(dataframes[i][j][1], dataframes[i][j][2])
        G.add_node(dataframes[i][j][1], cls=dataframes[i][j][3])
        G.add_node(dataframes[i][j][2], cls=dataframes[i][j][4])
        G.add_weighted_edges_from([(dataframes[i][j][1], dataframes[i][j][2],1 if w == None else w["weight"] + 1)])
        j = j + 1
    nodes = G.nodes()
    for no in nodes:
        ddict["graph"]["nodes"].append({"id": no, "degree": G.degree(no), "cls": nx.get_node_attributes(G, "cls")[no]})
    links = G.edges()
    for li in links:
        # print(li)
        ddict["graph"]["links"].append({"weight": G.get_edge_data(li[0], li[1])["weight"], "source": li[0], "target": li[1]})
    jsondata.append(ddict)
    i = i + 1
with open("C:/Users/Dell/Desktop/t-SNE_data.json", "w") as f:
    json.dump(jsondata, f)

