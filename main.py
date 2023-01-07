from vpython import *
import numpy as np

# HEIGHT, WIDTH, DEPTH = 100
# THICKNESS = 5

# ATOMS = []

ball = sphere(pos=vector(-5, 0, 0), radius=0.5, color=color.cyan, velocity=vector(0.05, 0, 0))

wallR = box(pos=vector(6, 0, 0), size=vector(0.2, 12, 12), color=color.white, opacity=0.2)
wallL = box(pos=vector(-6, 0, 0), size=vector(0.2, 12, 12), color=color.white, opacity=0.2)

deltat = 0.005
t = 0
while t < 10:
    rate(100)
    if ball.pos.x > wallR.pos.x:
        ball.velocity.x *= -1
    elif ball.pos.x < wallL.pos.x:
        ball.velocity.x *= -1
    ball.pos += ball.velocity
    t += deltat
