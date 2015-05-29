//碰撞检测
hitTest:function(a,b){
	var ax = a.offsetLeft,
		aw = ax+a.offsetWidth,
		ay = a.offsetTop,
		ah = ay+a.offsetHeight,
		bx = b.offsetLeft,
		bw = bx+b.offsetWidth,
		by = b.offsetTop,
		bh = by+b.offsetHeight;
	return (aw<bx || ah<by || ax>bw || ay>bh)?false:true;
}