cd habmaps
tmpfile='requirementstmp.txt'

cur=$(pwd)
temfil=$cur"/"$tmpfile
rm -f $tmpfile
touch $tmpfile


folders=($(ls -d */ | grep -v uise | xargs ))
for i in "${folders[@]}"
do
  echo "Procesando "$i
  cd $i
  pipreqs --force .
  cat requirements.txt >> $temfil
  rm requirements.txt
  cd $cur
done

cat $temfil | sort | grep -v database | grep -v helpers > /tmp/reqers.txt
cat /tmp/reqers.txt > $temfil
echo "** DONE **"
