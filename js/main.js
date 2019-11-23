function setSizes()
{
    let  height = window.innerHeight,
         width = window.innerWidth
    canvas.setAttribute('width',width);
    canvas.setAttribute('height',height);
}

window.onload = () =>
{
    let canvas = document.getElementById('canvas'),
                 mouseDowned = false,
                 sceneRotation = true,
                 gui = new dat.GUI()
    setSizes()
    let foo = 
    {
        rotation:true,
    }
    gui.add(foo,'rotation',false,true)
    

    let look =
    {
        x:0,
        y:0,
        z:0,
    }


    let renderer = new THREE.WebGLRenderer({canvas:canvas})
    renderer.setClearColor(0x333333)

    let scene = new THREE.Scene()

    let camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,5000)
    camera.position.set(0,0,1000)
    let light = new THREE.AmbientLight(0xffffff)
    scene.add(light)

    let geometry = new THREE.BoxGeometry( 200, 200, 200 )
    console.log(geometry)
    let material = new THREE.MeshNormalMaterial()
    console.log(material)
    let mesh = new THREE.Mesh(geometry,material)
    scene.add(mesh)

    window.addEventListener('resize',(e)=>
    {
        setSizes()
    },false)
    canvas.addEventListener( 'mousedown',(e)=>
    {
        if(e.button==0)
            mouseDowned = true;

    },false)
    canvas.addEventListener( 'mouseup',(e)=>
    {
        if(e.button==0)
            mouseDowned = false;
    },false)
    canvas.addEventListener( 'mousemove',(e)=>
    {
        if(mouseDowned)
        {
            if(foo.rotation)
            {
                scene.rotation.x -= e.movementY/100
                scene.rotation.y -= e.movementX/100
            }
            else
            {
                camera.position.x -= e.movementX
                camera.position.y += e.movementY
            }
        }
    }, false );

    function loop() 
    {


        renderer.render(scene,camera)
        requestAnimationFrame(()=>{loop()})
    }

    loop()
}