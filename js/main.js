let setSizes = (canvas) =>
{
    let height = window.innerHeight,
        width = window.innerWidth
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
}

let changeZ= (deltaZ,RotationElement,DisplacementElement,isRotation,speedRotation=1,speedDisplacement=1) =>
{
    if (isRotation) 
        RotationElement.rotation.z += deltaZ*speedRotation
    else
        DisplacementElement.position.z += deltaZ*speedDisplacement
}

let viewControl = (delta_x, delta_y,RotationElement,DisplacementElement,isRotation=true,speedRotation=1,speedDisplacement=1) => 
{
    if (isRotation) 
    {
        RotationElement.rotation.x -= delta_y*speedRotation
        RotationElement.rotation.y -= delta_x*speedRotation
    }
    else 
    {
        DisplacementElement.position.x -= delta_x*speedDisplacement
        DisplacementElement.position.y += delta_y*speedDisplacement
    }
}

window.onload = () => {
    let canvas = document.getElementById('canvas'),
        hammer = new Hammer(canvas,)
        sceneRotation = true,
        gui = new dat.GUI(),
        lastTouch = true
    hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL });
    hammer.get('pinch').set({ enable: true });

    setSizes(canvas)
    let foo =
    {
        rotation: true,
    }
    gui.add(foo, 'rotation', false, true)
    


    let look =
    {
        x: 0,
        y: 0,
        z: 0,
    }


    let renderer = new THREE.WebGLRenderer({ canvas: canvas })
    renderer.setClearColor(0x333333)

    let scene = new THREE.Scene()

    let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 5000)
    camera.position.set(0, 0, 1000)

    let raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();
    raycaster.setFromCamera( mouse, camera );

    let light = new THREE.AmbientLight(0xffffff)
    scene.add(light)

    let geometry = new THREE.BoxGeometry(200, 200, 200)
    scene.add(new THREE.Mesh(geometry, new THREE.MeshBasicMaterial()))
    scene.add(new THREE.Mesh(geometry, new THREE.MeshBasicMaterial()))
    console.log(scene.children)
    scene.children[2].position.x = -400

    window.addEventListener('resize', (e) => 
    {
        setSizes(canvas)
    }, false)
    
    hammer.on('pan',(e)=>
    {
        var Meshs = Array.prototype.filter.call(scene.children, (object) => object.type=='Mesh' ),  
            el = Meshs.filter((object)=>object.isSelected==true)[0];
        if(typeof el == 'undefined')
            viewControl(e.srcEvent.movementX,e.srcEvent.movementY,scene,camera,foo.rotation,-0.01,0.9)
        else 
            viewControl(-e.srcEvent.movementX,-e.srcEvent.movementY,el,el,foo.rotation,0.01,0.9)
    })
    
    canvas.addEventListener('wheel',(e)=>
    {
        var Meshs = Array.prototype.filter.call(scene.children, (object) => object.type=='Mesh' ),  
            el = Meshs.filter((object)=>object.isSelected==true)[0];
        if(typeof el == 'undefined')
            changeZ(e.deltaY,scene,camera,foo.rotation,-0.01,0.9)
        else
            changeZ(e.deltaY,el,el,foo.rotation,-0.01,0.9)
    })
    canvas.addEventListener('dblclick',(e)=>
    {
        var Meshs = Array.prototype.filter.call(scene.children, (object) => object.type=='Mesh' ),  
            el = Meshs.filter((object)=>object.pointerOn==true)[0];
        Meshs.forEach((object)=>
        {
            object.isSelected = false
            object.material.color.set(0xffffff)
        })
        if(typeof el != 'undefined')
        {
            el.isSelected = true
            el.material.color.set(0x0000ff)
        }
           
    })
    window.addEventListener( 'mousemove', (e)=>
    {
        mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
    }, false );
    function loop() {
        raycaster.setFromCamera( mouse, camera );
        let intersects = raycaster.intersectObjects( scene.children )
        Array.prototype.forEach.call(scene.children,(object)=>
        {
            if(object.type=='Mesh')
                object.pointerOn = false
        })
       
        Array.prototype.forEach.call(intersects,({object})=>
        {
            if(object.type=='Mesh')
                object.pointerOn = true
        });
        renderer.render(scene, camera)
        requestAnimationFrame(() => { loop() })
    }

    loop()
}