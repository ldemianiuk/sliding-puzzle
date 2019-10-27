for i in {0..15}
do
	convert -size 500x500 -background CornflowerBlue -font Courier-Bold -pointsize 400 -fill black -gravity center caption:"$((i+1))" -flatten $i.jpg
done
