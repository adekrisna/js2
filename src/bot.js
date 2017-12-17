const LineConnect = require('./connect');
let LINE = require('./main.js');
console.info("\n\
=========================================\n\
BotName: LINE Etot JS\n\
Version: 0.2.2\n\
Terima Kasih Kepada @Alfathdirk @TCR_TEAM\n\
=========================================\n\
\nNOTE : Ini Adalah AlphatJS Lama Buatan @Alfathdirk @TCR_TEAM Dan Ini Telah Dikembangin Oleh @TAB_TEAM dan di edit lagi oleh @CAB_TEAM\nTolong Untuk Tidak Perjual-Belikan Script Ini!\n\
****Nekopoi.host Running****");

const auth = {
	channelAccessToken: ' Fslp5pVm47I+AsP5lLwST2GnmkJqOXQMNLRGM3lHCGq71HXFv209pMfAq4LcdGLR/VFVdNlKk6Uw+Pr8l83tfq4rAYYYv5j1Wxcr4GzR5bKqONftU5LeelnORiquV9NkspHr5exu+/vkqG3igF8y+wdB04t89/1O/w1cDnyilFU= ',
	channelSecret: ' ac62c6b5a0698e0423d2c526124c5a6b ',
}
// let client =  new LineConnect(auth);
let client =  new LineConnect();

client.startx().then(async (res) => {
	
	while(true) {
		try {
			ops = await client.fetchOps(res.operation.revision);
		} catch(error) {
			console.log('error',error)
		}
		for (let op in ops) {
			if(ops[op].revision.toString() != -1){
				res.operation.revision = ops[op].revision;
				LINE.poll(ops[op])
			}
		}
	}
});
