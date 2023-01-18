;; domain file: domain-robot1.pddl
(define (domain robot1)
    (:requirements :strips)
    (:predicates
        (is_in_room ?robot ?room1)
        (is_adjacent ?room1 ?room2)
        (is_in_bs ?base_station ?robot)
        (is_dirty ?room)
        (bs_in_room ?base_station ?room)              
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