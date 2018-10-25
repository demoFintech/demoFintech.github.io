// Generate random room name if needed
if (!location.hash) {
    //location.hash = Math.floor(Math.random() * 0xFFFFFF).toString(16);
    location.hash = 'demoFintech';
}
//const roomHash = location.hash.substring(1);
const roomHash = 'demoFintech';
console.log(roomHash);

// TODO: Replace with your own channel ID
const drone = new ScaleDrone('yiS12Ts5RdNhebyM');
// Room name needs to be prefixed with 'observable-'
const roomName = 'observable-' + roomHash;
console.log(roomName);
const configuration = {
    iceServers: [{
        urls: 'stun:stun.l.google.com:19302'
    }]
};
let room;
let pc;
var myStream;
var reStream;

function onSuccess() {};

function onError(error) {
    console.error(error);
};

drone.on('open', error => {
    console.log("opening drone");
    if (error) {
        return console.error(error);
    }
    room = drone.subscribe(roomName);
    room.on('open', error => {
        if (error) {
            onError(error);
        }
    });
    // We're connected to the room and received an array of 'members'
    // connected to the room (including us). Signaling server is ready.
    room.on('members', members => {
        console.log("member connecting");
        console.log('MEMBERS', members);
        // If we are the second user to connect to the room we will be creating the offer
        const isOfferer = members.length === 2;
        console.log("isOfferer?" + isOfferer);
        startWebRTC(isOfferer);
    });
});

// Send signaling data via Scaledrone
function sendMessage(message) {
    drone.publish({
        room: roomName,
        message
    });
}

function startWebRTC(isOfferer) {
    console.log("webrtc starting");
    console.log("webrtc starting isOfferer? :" + isOfferer);
    pc = new RTCPeerConnection(configuration);

    // 'onicecandidate' notifies us whenever an ICE agent needs to deliver a
    // message to the other peer through the signaling server
    pc.onicecandidate = event => {
        console.log("pc.onicecandidate");
        if (event.candidate) {
            sendMessage({
                'candidate': event.candidate
            });
        }
    };

    // If user is offerer let the 'negotiationneeded' event create the offer
    if (isOfferer) {
        console.log("isOfferer? Yes");
        pc.onnegotiationneeded = () => {

            var canvasLocal = document.getElementById('canvasOutputLocal');
            var ctxLocal = canvasLocal.getContext('2d');
            var videoLocal = document.getElementById('localVideo');

            videoLocal.addEventListener('play', function() {
                var $this = this; //cache
                (function loop() {
                    if (!$this.paused && !$this.ended) {
                        ctxLocal.drawImage($this, 0, 0);
                        setTimeout(loop, 1000 / 30); // drawing at 30fps
                    }
                })();
            }, 0);
            canvasOutputLocal.setAttribute("style", "display:;position:absolute;top:610;left:918;width:257;height:193;");
            canvasOutput.setAttribute("style", "display: none;");
            remoteVideo.setAttribute("style", "width: 140%;height: auto;position: absolute;top: 0;left: 0;");
            localVideo.setAttribute("style", "display: ;");
			imgUsed.setAttribute("style", "display: ;");
            canvasOutputLocal.setAttribute("style", "display: ;");
            hangup.setAttribute("style","position:absolute;left:555;top:773;border-radius:50px;");
            pc.createOffer().then(localDescCreated).catch(onError);
        }
    }else{
		var canvasLocal = document.getElementById('canvasOutputLocal');
            var ctxLocal = canvasLocal.getContext('2d');
            var videoLocal = document.getElementById('localVideo');

            videoLocal.addEventListener('play', function() {
                var $this = this; //cache
                (function loop() {
                    if (!$this.paused && !$this.ended) {
                        ctxLocal.drawImage($this, 0, 0);
                        setTimeout(loop, 1000 / 30); // drawing at 30fps
                    }
                })();
            }, 0);
	}

    // When a remote stream arrives display it in the #remoteVideo element
    pc.ontrack = event => {
        console.log("setting remote stream");
        const stream = event.streams[0];
        if (!remoteVideo.srcObject || remoteVideo.srcObject.id !== stream.id) {
            console.log("remote stream set!");
            remoteVideo.srcObject = stream;
			reStream = stream;
            localVideo.setAttribute("style", "display: none;");
            //setTimeout(callRestApi, 5000);
            if (!isOfferer) {
                canvasOutput.setAttribute("style", "display:;position:absolute;top:1px;left:55px;width:1019px;height:479px;");
            } else {
                canvasOutput.setAttribute("style", "display: none;");
                img1.setAttribute("style", "display: none;");
                img2.setAttribute("style", "display: none;");
				bar.setAttribute("style","display: none;");
divChecking.setAttribute("style","display: none;");
kycInfo.setAttribute("style","display: none;");
approve.setAttribute("style","display: none;");
reject.setAttribute("style","display: none;");
body.setAttribute("style","position:;");
divVerify.setAttribute("style","display: none;");
                remoteVideo.setAttribute("style", "width: 140%;height: auto;position: absolute;top: 0;left: 0;");
                localVideo.setAttribute("style", "display: ;");
                canvasOutputLocal.setAttribute("style", "display:;position:absolute;top:610;left:918;width:257;height:193");

                var canvasLocal = document.getElementById('canvasOutputLocal');
                var ctxLocal = canvasLocal.getContext('2d');
                var videoLocal = document.getElementById('localVideo');
                videoLocal.addEventListener('play', function() {
                    var $this = this; //cache
                    (function loop() {
                        if (!$this.paused && !$this.ended) {
                            ctxLocal.drawImage($this, 0, 0);
                            setTimeout(loop, 1000 / 30); // drawing at 30fps
                        }
                    })();
                }, 0);

            }

        } else {
            localVideo.setAttribute("style", "display: none;");
            if (!isOfferer) {
                canvasOutput.setAttribute("style", "display:;position:absolute;top:1px;left:55px;width:1019px;height:479px;");
            } else {
                canvasOutput.setAttribute("style", "display: none;");
                img1.setAttribute("style", "display: none;");
                img2.setAttribute("style", "display: none;");
				bar.setAttribute("style","display: none;");
divChecking.setAttribute("style","display: none;");
kycInfo.setAttribute("style","display: none;");
approve.setAttribute("style","display: none;");
reject.setAttribute("style","display: none;");
body.setAttribute("style","position:;");
divVerify.setAttribute("style","display: none;");
                remoteVideo.setAttribute("style", "width: 140%;height: auto;position: absolute;top: 0;left: 0;");
                localVideo.setAttribute("style", "display: ;");
                canvasOutputLocal.setAttribute("style", "display:;position:absolute;top:610;left:918;width:257;height:193");

                var canvasLocal = document.getElementById('canvasOutputLocal');
                var ctxLocal = canvasLocal.getContext('2d');
                var videoLocal = document.getElementById('localVideo');
                videoLocal.addEventListener('play', function() {
                    var $this = this; //cache
                    (function loop() {
                        if (!$this.paused && !$this.ended) {
                            ctxLocal.drawImage($this, 0, 0);
                            setTimeout(loop, 1000 / 30); // drawing at 30fps
                        }
                    })();
                }, 0);

            }

        }
    };

    navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
    }).then(stream => {
        // Display your local video in #localVideo element
        localVideo.srcObject = stream;
		myStream = stream;
        // Add your stream to be sent to the conneting peer
        stream.getTracks().forEach(track => pc.addTrack(track, stream));
    }, onError);

    // Listen to signaling data from Scaledrone
    room.on('data', (message, client) => {
        // Message was sent by us
        if (client.id === drone.clientId) {
            return;
        }

        if (message.sdp) {
            console.log("message.sdp: " + message.sdp);
            // This is called after receiving an offer or answer from another peer
            pc.setRemoteDescription(new RTCSessionDescription(message.sdp), () => {
                console.log("setRemoteDescription");
                // When receiving an offer lets answer it
                if (pc.remoteDescription.type === 'offer') {
                    pc.createAnswer().then(localDescCreated).catch(onError);
                }
            }, onError);
        } else if (message.candidate) {
            // Add the new ICE candidate to our connections remote description
            pc.addIceCandidate(
                new RTCIceCandidate(message.candidate), onSuccess, onError
            );
        }
    });
}

function localDescCreated(desc) {
    pc.setLocalDescription(
        desc,
        () => sendMessage({
            'sdp': pc.localDescription
        }),
        onError
    );
}

function callRestApi() {
    console.log("call rest Api");
    var fd = new FormData();
    var imageIdCardData = getBase64Image(document.getElementById("imageIdCardData"),"imageCaptured");
    var imageBestData = getBase64Image(document.getElementById("imageBestData"),"hardcodeIc");
    fd.append("apiKey", "bZz35LDHntq4DvEQ3Ha8jvH8BTk3qsLr");
    fd.append("imageIdCard", base64ImageToBlob(imageIdCardData));
    fd.append("imageBest", base64ImageToBlob(imageBestData));
    console.log(base64ImageToBlob(imageBestData));
    $.ajax({
        url: "https://demo.faceid.asia/api/faceid/v1/verify",
        type: "POST",
        data: fd,
        contentType: false,
        processData: false,
        cache: false,
        success: function(response) {
            console.log("response: " + response);
            var jsonObj = JSON.parse(response);
            console.log("jsonObj: " + jsonObj.result_idcard.confidence);
            var confidence = jsonObj.result_idcard.confidence;
            console.log("confidence:" + confidence);
            var x = Math.floor(confidence);
            console.log("x:" + x);
            //img1
            var isNotNumber = isNaN(x);
            console.log("isNumber " + isNumber );
            if (x > 70) {
                document.getElementById('percent').innerHTML = '<font color="green">' + x + '%</font>';
                document.getElementById('verify').innerHTML = '<font color="green">VERIFIED</font>';
				imgUsed.setAttribute("style", "visibility: visible;position: absolute;left: 1092px;top: 0px;width: 204px;height: 270px;");
				percent.setAttribute("style","position: absolute;top: 78px;left: 257px;");
				verify.setAttribute("style","position: absolute;top: 118px;left: 251px;");
            }else{
				if (isNotNumber){
				document.getElementById('percent').innerHTML = '<font color="red">' + 0 + '%</font>';
				}else{
				document.getElementById('percent').innerHTML = '<font color="red">' + x + '%</font>';	
				}
                document.getElementById('verify').innerHTML = '<font color="red">FAILED</font>';
				//set the visibility to visible
				imgUsed.setAttribute("style", "visibility: visible;position: absolute;left: 1092px;top: 0px;width: 204px;height: 270px;");
				resendApiButton.setAttribute("style","visibility:visible;position:absolute;left: 239px;top: 167px;");
				percent.setAttribute("style","position: absolute;top: 78px;left: 260px;font-size: 32px;font-weight: 550;");
				verify.setAttribute("style","position: absolute;top: 125px;left: 264px;font-size: 14;font-weight: 550;");
			}
        },
        error: function(e) {
            console.log('Verify failed...');
        },
        complete: function() {}
    })
}

function base64ImageToBlob(str) {
    // decode base64
    var imageContent = atob(str);
    // create an ArrayBuffer and a view (as unsigned 8-bit)
    var buffer = new ArrayBuffer(imageContent.length);
    var view = new Uint8Array(buffer);
    // fill the view, using the decoded base64
    for (var n = 0; n < imageContent.length; n++) {
        view[n] = imageContent.charCodeAt(n);
    }
    // convert ArrayBuffer to Blob
    var blob = new Blob([buffer], {
        0: 0
    });
    return blob;
}

function getBase64Image(img,str) {
    console.log(str);
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    console.log(dataURL);
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

function stopLocalStream(){
					console.log("stop local stream");
					//console.log(myStream);
					//pc.removeStream(myStream);
					//pc.removeStream(reStream);
					//pc.close();
					//var local = document.getElementById("localVideo");
					//video.pause();
					//video.srcObject = null;
					//console.log(myStream);
					console.log("before");
					console.log(pc);
					var remoteVideo = document.getElementById("remoteVideo");
  var localVideo = document.getElementById("localVideo");

  if (pc) {
	  console.log("pc = true");
    pc.ontrack = null;
    pc.onremovetrack = null;
    pc.onremovestream = null;
    pc.onnicecandidate = null;
    pc.oniceconnectionstatechange = null;
    pc.onsignalingstatechange = null;
    pc.onicegatheringstatechange = null;
    pc.onnotificationneeded = null;

    if (remoteVideo.srcObject) {
      remoteVideo.srcObject.getTracks().forEach(track => track.stop());
    }

    if (localVideo.srcObject) {
      localVideo.srcObject.getTracks().forEach(track => track.stop());
    }

    pc.close();
    pc = null;
  }
  console.log("after");
 console.log(pc);
  remoteVideo.removeAttribute("src");
  remoteVideo.removeAttribute("srcObject");
  localVideo.removeAttribute("src");
  remoteVideo.removeAttribute("srcObject");
				}
				
				setInterval(function() {
				if(pc.iceConnectionState != null)		
					console.log(pc.iceConnectionState);
					if(pc.iceConnectionState == "disconnected"){
						console.log("sudah disconnected");
remoteVideo.setAttribute("style","visibility:hidden;");
canvasOutputLocal.setAttribute("style","visibility:hidden;");
localVideo.setAttribute("style","visibility:hidden;");
imgUsed.setAttribute("style","visibility:hidden;");
hangup.setAttribute("style","visibility:hidden;");
}
			if(pc.iceConnectionState == null)
						console.log("sudah null");
                    }, 1000);
				
				
				function resendApi(){
                console.log("enter resend API");
				var video = document.getElementById('remoteVideo');
                var canvas = document.getElementById('canvasIc');
                var context = canvas.getContext('2d');
				context.clearRect(0, 0, canvas.width, canvas.height);
				if (video.playing){
                    console.log("remote video playing");
                }else{
                    console.log("remote video not playing");
                }
				imgUsed.src = canvas.toDataURL("image/png");
				console.log("cleared context");
                var w, h, ratio;
                video.addEventListener('play', function() {
                    console.log("button clicked");
                    ratio = video.videoWidth / video.videoHeight;
                    w = video.videoWidth - 100;
                    h = parseInt(w / ratio, 10);
                    canvas.width = w;
                    canvas.height = h;
                    var interval = setInterval(function() {
                        snap(interval);
                    }, 1000);

                }, false);
                //setTimeout(snap(),1000);

                function snap(interval) {
                    console.log("snap");
                    context.fillRect(0, 0, w, h);
                    // Grab the image from the video
                    context.drawImage(video, 0, 0, w, h);
                    console.log("done snap");
                    console.log(canvas.toDataURL);
                    imageIdCardData.src = canvas.toDataURL("image/png");
					imgUsed.src = canvas.toDataURL("image/png");
					clearInterval(interval);
                }

			callRestApi();
}