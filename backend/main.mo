import Text "mo:base/Text";

import Debug "mo:base/Debug";

actor {
  public func greet(name : Text) : async Text {
    Debug.print("Greeting " # name);
    return "Hello, " # name # "!";
  };

  public query func healthCheck() : async Text {
    return "OK";
  };
}
