class Wave
{
    settings =
    {
        container: "body",
        height: 200,
        amplitude: 100,
        speed: 0.15,
        bones: 3
    };

    constructor( path, settings )
    {
        if( typeof settings === "undefined" )
        {
            settings = { };
        }

        this.settings = Object.assign(this.settings, settings);

        this.path = path;
        this.lastUpdate = 0;
        this.totalTime = 0;
        this.animationHandle = false;
        this.tween = false;

        this.resize = this.resize.bind(this);
    }

    getPoints( factor )
    {
        let points = [];

        for( let i = 0; i <= this.settings.bones; i++ )
        {
            let x = (i / this.settings.bones) * this.width;
            let sinSeed = (factor + (i + (i % this.settings.bones))) * this.settings.speed * 100;
            let sinHeight = Math.sin(sinSeed / 100) * this.settings.amplitude;
            let y = Math.sin(sinSeed / 100) * sinHeight + this.settings.height;
            points.push({ x: x, y: y });
        }

        return points;
    }

    getPath( points )
    {
        let svg = "M " + points[0].x + " " + points[0].y;

        let cp0 =
        {
            x: (points[1].x - points[0].x) / 2,
            y: points[1].y - points[0].y + points[0].y + (points[1].y - points[0].y)
        };

        svg += " C " + cp0.x + " " + cp0.y + " " + cp0.x + " " + cp0.y + " " + points[1].x + " " + points[1].y;

        let prevCp = cp0;
        let inverted = -1;
        for( let i = 1; i < points.length - 1; i++ )
        {
            //let cpLength = Math.sqrt(prevCp.x * prevCp.x + prevCp.y * prevCp.y);
            let cp1 =
            {
                x: points[i].x - prevCp.x + points[i].x,
                y: points[i].y - prevCp.y + points[i].y
            };

            svg += " C " + cp1.x + " " + cp1.y + " " + cp1.x + " " + cp1.y + " " + points[i + 1].x + " " + points[i + 1].y;

            prevCp = cp1;
            inverted = -inverted;
        }

        svg += " L " + this.width + " " + this.height;
        svg += " L 0 " + this.height + " Z";

        return svg;
    }

    render( deltaTime )
    {
        this.totalTime += deltaTime;

        let factor = this.totalTime * Math.PI;
        this.tween = gsap.to(this.path,
        {
            attr: { d: this.getPath(this.getPoints(factor)) },
            duration: 0,
            ease: Power1.easeInOut
        });
    }

    update()
    {
        let now = window.Date.now();

        if( this.lastUpdate )
        {
            let deltaTime = (now - this.lastUpdate) / 1000; // ms
            this.lastUpdate = now;

            this.render(deltaTime);
        }
        else
        {
            this.lastUpdate = now;
        }
    }

    tick()
    {
        this.update();
        this.animationHandle = window.requestAnimationFrame(this.tick.bind(this));
    }

    resize()
    {
        let rect = document.querySelector(this.settings.container).getBoundingClientRect();
        this.width = rect.width;
        this.height = rect.height;

        this.render(0);
    }

    play()
    {
        if( !this.animationHandle )
        {
            let rect = document.querySelector(this.settings.container).getBoundingClientRect();
            this.width = rect.width;
            this.height = rect.height;

            window.addEventListener("resize", this.resize);
            this.animationHandle = window.requestAnimationFrame(this.tick.bind(this));
        }
    }

    pause()
    {
        if( this.animationHandle )
        {
            window.cancelAnimationFrame(this.animationHandle);
            this.animationHandle = false;
            this.lastUpdate = false;
        }
    }

    stop()
    {
        this.pause();

        window.removeEventListener("resize", this.resize);

        this.tween.kill();
        this.tween = gsap.set(this.path,
        {
            x: 0,
            y: 0,
            rotation: 0,
            opacity: 0,
            clearProps: "all",
            attr: { d: "M0,0" }
        });
    }
}