import Container from '../components/Container';
import CategoryGrid from '../components/CategoryGrid';

export default function Categories() {
  return (
    <Container className="py-14">
      <p className="text-signal text-sm uppercase tracking-widest mb-2">Browse</p>
      <h1 className="font-display font-700 text-3xl sm:text-4xl mb-3">Shop by category</h1>
      <p className="text-mute max-w-xl mb-10">
        Six categories, thirty-plus pieces of gear. Pick a category to jump straight into the
        catalogue, filtered and ready.
      </p>
      <CategoryGrid />
    </Container>
  );
}
