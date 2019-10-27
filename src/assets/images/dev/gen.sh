for i in {0..15}
do
	convert -size 500x500 -background white -font Courier-Bold -pointsize 400 -fill black -gravity center caption:"$i" -flatten $i.jpg
done
