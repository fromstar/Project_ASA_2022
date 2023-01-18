# Project_ASA_2022

In this project a smart house environment is simulated. In the scenario presented, the presence of people in the various rooms, the production of electricity by photovoltaic panels, the cleanliness and temperature of the rooms
are monitored. Thanks to this information a main smart agent (HouseAgent)
knows everything that happens in the house and is able to manage the agents
in charge of cleaning the various rooms. Two other agents (LightAgent and
ShutterAgent) are in charge of lighting a room if a person is present. Depending on the natural brightness, it is decided whether the shutters must be opened
or the lights must be switched on, so as to guarantee energy savings. Two last
robots agents are tasked with cleaning the floors of the house and are the sole
planning agents. The various agents can exchange information each other in
order to perform tasks in different places.

## Requirements

Javascript, Node.

## Run

To install the module use this command in the main folder:
```
npm install
```
To run the code use:
```
npm run test
```
or 
```
node ./src/houseworld/HouseWorld.js
```

## ASA_assignment_3

### Domain
This sample domain file uses the key-in extension which cannot be used in simulation. In the simulation, therefore, the problem is circumvented through the use of predicates with characteristics that still allow to distinguish different types.

```
;; domain file: domain-robot1.pddl
(define (domain robot1)
    (:requirements :strips :typing)
    (:types
        robot
        room 
        base_station 
    )
    
    (:predicates
        (is_in_room ?robot - robot ?room1 - room)
        (is_adjacent ?room1 - room ?room2 - room)
        (is_in_bs ?base_station - base_station ?robot - room)
        (is_dirty ?room - room)
        (bs_in_room ?base_station - base_station ?room - room)              
    )
    
        (:action Move
            :parameters (?robot ?room1 ?room2 ?base_station)
            :precondition (and
                (is_in_room ?robot ?room1)
                (is_adjacent ?room1 ?room2)
            )
            :effect (and
                (not (is_in_room ?robot ?room1))
                (is_in_room ?robot ?room2)
                (not (is_in_bs ?base_station ?robot))
            )
        )
        
        (:action Clean
            :parameters (?room ?robot)
            :precondition (and
                (is_in_room ?robot ?room)
                (is_dirty ?room)
            )
            :effect (and
                (not (is_dirty ?room))
            )
        )
        
        (:action Charge
            :parameters (?robot ?base_station ?room)
            :precondition (and
                (is_in_room ?robot ?room)
                (bs_in_room ?base_station ?room)
                (not (is_in_bs ?base_station ?robot))
            )
            :effect (and
                (is_in_bs ?base_station ?robot)
            )
        )
)
```
### Problem
This sample problem file contains all the information about the environment that the agent knows.

```
;; problem file: problem-robot1.pddl
(define (problem robot1)
    (:domain robot1)
    (:objects
        office - room
        tavern - room
        basement_bathroom - room
        base_station1 - base_station
        robot1 - robot
    )
    (:init
        (is_adjacent office tavern)
        (is_adjacent tavern office)
        (is_adjacent tavern basement_bathroom)
        (is_adjacent basement_bathroom tavern)
        (bs_in_room base_station1 tavern)
        (is_in_room robot1 tavern)
        (is_in_bs base_station1 robot1)
        (is_dirty tavern)
        (is_dirty office)
    )
    (:goal
        (and (not (is_dirty tavern)) (not (is_dirty basement_bathroom)) (not (is_dirty office)) (is_in_bs base_station1 robot1))
    )
)
```