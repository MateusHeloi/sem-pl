const Bubbles = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute w-4 h-4 bg-primary/10 rounded-full animate-float-up"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: '-5%',
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${8 + Math.random() * 6}s`,
            width: `${Math.random() * 30 + 10}px`,
            height: `${Math.random() * 30 + 10}px`,
          }}
        />
      ))}
    </div>
  );
};

export default Bubbles;
