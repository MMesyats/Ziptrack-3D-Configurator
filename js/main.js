var fileInput, canvas, renderer, scene, camera, raycaster, mouse, orbitControl, transformControl;

let setSizes = canvas => {
  let height = window.innerHeight,
      width = window.innerWidth;
  canvas.setAttribute("width", width);
  canvas.setAttribute("height", height);
};

let render = () => {
  raycaster.setFromCamera(mouse, camera);
  renderer.render(scene, camera);
}

window.onload = () => {
  fileInput = document.getElementById('fileInput')
  fileInput.addEventListener('change', (e) => {
    let imgFile = fileInput.files[0];

    let reader = new FileReader();
    reader.onload = (e) => {
      let bg = new THREE.TextureLoader().load(e.target.result);
      scene.background = bg
      render()

    }
    reader.readAsDataURL(imgFile);
  })
  canvas = document.getElementById("canvas"),
    gui = new dat.GUI();

  setSizes(canvas);
  let foo = {
    mode: "rotate"
  };

  renderer = new THREE.WebGLRenderer({ canvas: canvas });
  renderer.setClearColor(0x333333);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.BasicShadowMap;

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.01,
    5000
  );

  camera.position.set(0, 0, 1000);

  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();
  raycaster.setFromCamera(mouse, camera);

  ablight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ablight);

  light = new THREE.PointLight(0xffffff, 0.4, 1000);
  light.position.set(0, 0, 300)
  light.castShadow = true;
  scene.add(light)

  transformControl = new THREE.TransformControls(camera, canvas);
  transformControl.setMode("rotate");
  transformControl.addEventListener("change", render);

  scene.add(transformControl)
  var params = {
    loadFile: function () {
      fileInput.click();
    }
  }
  gui
    .add(foo, "mode", { Rotate: "rotate", Translate: "translate", Scale: 'scale' })
    .onChange(val => transformControl.setMode(val));
  gui
    .add(params, 'loadFile').name('Upload_Background');

  let loader = new THREE.STLLoader();
  loader.load(
    window.location.href + "/assets/models/pelmet.STL",
    geometry => {
      geometry.center();
      let mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial());
      mesh.castShadow = true;
      mesh.receiveShadow = false;
      console.log(mesh)
      gui
        .addColor({ color: 0xffffff }, 'color')
        .onChange((val) => { mesh.material.setValues({ 'color': val }); render(); })
        .name('Change color')
      scene.add(mesh);
      transformControl.attach(mesh);
      render()
    },
    xhr => console.log((xhr.loaded / xhr.total) * 100 + "% loaded"),
    error => console.log("An error happened")
  );

  window.addEventListener(
    "mousemove",
    e => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    },
    false
  );



  render();
};
