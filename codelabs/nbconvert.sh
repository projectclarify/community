
SCRIPT=$(readlink -f $0)

jupyter nbconvert --to markdown `dirname $SCRIPT`/src/basics/*.ipynb
