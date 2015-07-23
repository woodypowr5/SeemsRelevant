function node(id, status, requires, xpos, ypos) {
    this.id = id;
    this.status = status;
    this.requires = requires;
    this.xpos = xpos;
    this.ypos = ypos;
    // this.setNode = function(args){
        
    //     if(args.id){
    //         this.id = args.id;
    //     }
    //     if(args.status){
    //         this.status = args.status;
    //     }  
    //     if(args.requires){
    //         this.requires = args.requires;
    //     }  
    //     if(args.xpos){
    //         this.xpos = args.xpos;
    //     }  
    //     if(args.ypos){
    //         this.ypos = args.ypos;
    //     }  
    // }
}

function path(id, status, xpos1, ypos1, xpos2, ypos2, timeRequired){
	this.id = id;
	this.status = status;
	this.xpos1 = xpos1;
	this.ypos1 = ypos1;
	this.xpos2 = xpos2;
	this.ypos2 = ypos2;
	this.timeRequired = timeRequired;
}