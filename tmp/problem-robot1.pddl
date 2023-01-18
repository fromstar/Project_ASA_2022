;; problem file: problem-robot1.pddl
(define (problem robot1)
    (:domain robot1)
    (:objects office tavern basement_bathroom entrance living_room guest_bathroom kitchen dining_room bedroom bedroom_bathroom base_station2 base_station1 robot2 robot1)
	(:init (is_adjacent office tavern) (is_adjacent tavern office) (is_adjacent tavern basement_bathroom) (is_adjacent basement_bathroom tavern) (is_adjacent entrance living_room) (is_adjacent living_room entrance) (is_adjacent entrance guest_bathroom) (is_adjacent guest_bathroom entrance) (is_adjacent entrance kitchen) (is_adjacent kitchen entrance) (is_adjacent kitchen dining_room) (is_adjacent dining_room kitchen) (is_adjacent entrance bedroom) (is_adjacent bedroom entrance) (is_adjacent bedroom bedroom_bathroom) (is_adjacent bedroom_bathroom bedroom) (bs_in_room base_station2 entrance) (bs_in_room base_station1 tavern) (is_in_room robot2 entrance) (is_in_room robot1 tavern) (is_in_bs base_station2 robot2) (is_in_bs base_station1 robot1) (is_dirty tavern) (is_dirty office) (is_dirty basement_bathroom) (is_dirty entrance) (is_dirty living_room) (is_dirty guest_bathroom) (is_dirty kitchen) (is_dirty dining_room) (is_dirty bedroom) (is_dirty bedroom_bathroom))
	(:goal (and (not (is_dirty tavern)) (not (is_dirty basement_bathroom)) (not (is_dirty office)) (is_in_bs base_station1 robot1)))
)
