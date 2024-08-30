export const idlFactory = ({ IDL }) => {
  return IDL.Service({ 'increment' : IDL.Func([], [IDL.Nat], []) });
};
export const init = ({ IDL }) => { return []; };
