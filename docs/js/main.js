//===================================================================
// three.js の各種設定
//===================================================================
var scene = new THREE.Scene();                        // シーンの作成
var camera = new THREE.Camera();                      // カメラの作成
var ar = new ARObject(scene, camera);
var renderer = new THREE.WebGLRenderer({              // レンダラの作成
  antialias: true,                                    // アンチエイリアス有効
  alpha: true,                                        // canvasに透明度バッファを持たせる
});
renderer.setClearColor(new THREE.Color("black"), 0);  // レンダラの背景色
renderer.setSize(640, 480);                           // レンダラのサイズ
renderer.domElement.style.position = "absolute";      // レンダラの位置は絶対値
renderer.domElement.style.top = "0px";                // レンダラの上端
renderer.domElement.style.left = "0px";               // レンダラの左端
document.body.appendChild(renderer.domElement);       // レンダラの DOM を body に入れる
scene.add(camera);                                    // カメラをシーンに追加
var light = new THREE.DirectionalLight(0xffffff);     // 平行光源（白）を作成
light.position.set(0, 0, 2);				// カメラ方向から照らす
scene.add(light);					// シーンに光源を追加
var ambientlight = new THREE.AmbientLight(0x888888);	// 環境光を追加
scene.add(ambientlight);				// シーンに光源を追加

ar.init(renderer);

//===================================================================
// レンダリング・ループ
//===================================================================
function renderScene() { 					// レンダリング関数
	requestAnimationFrame(renderScene);			// ループを要求
	ar.update();
  	renderer.render(scene, camera);				// レンダリング実施
}
renderScene();							// 最初に1回だけレンダリングをトリガ

