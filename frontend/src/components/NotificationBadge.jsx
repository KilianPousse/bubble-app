function NotificationBadge({ count = 0 }) {
  const displayCount = count > 99 ? '99+' : count;
  
  if (count <= 0) {
    return null;
  }

  return (
    <div 
      className="absolute -top-2 -right-2 transition-none"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '20px',
        height: '20px',
        padding: '0 3px',
        backgroundColor: '#ff4444',
        color: 'white',
        borderRadius: '10px',
        fontSize: '12px',
        fontWeight: 'bold',
        lineHeight: 1,
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      }}
    >
      {displayCount}
    </div>
  );
};
export default NotificationBadge;