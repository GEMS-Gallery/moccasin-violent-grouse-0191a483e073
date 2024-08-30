import Nat "mo:base/Nat";

import Debug "mo:base/Debug";

actor {
    stable var counter : Nat = 0;

    public func increment() : async Nat {
        counter += 1;
        Debug.print("Counter: " # debug_show(counter));
        counter
    };

    system func preupgrade() {
        Debug.print("Preparing to upgrade...");
    };

    system func postupgrade() {
        Debug.print("Upgrade complete!");
    };
}
