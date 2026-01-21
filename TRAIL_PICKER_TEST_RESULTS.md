# Trail Picker Logic Test Results

## Trail Characteristics
- **Trail 1**: Beginner, Short (45-60min), Self-guided, Min: First-time
- **Trail 2**: Beginner, Medium (2hrs), Self-guided, Min: First-time  
- **Trail 3**: Moderate, Medium (2.5-3hrs), Guide required, Min: Some experience
- **Trail 4**: Moderate, Medium (1.5-2hrs), Guide required, Min: Some experience
- **Trail 5**: Challenging, Long (3hrs), Guide required, Min: Experienced
- **Trail 6**: Challenging, Long (6hrs), Guide required, Min: Experienced
- **Trail 7**: Beginner, Short (1.5hrs), Self-guided, Min: First-time

## NEW LOGIC: Experience Level Flexibility

**More experienced hikers can do easier trails:**
- **First-time hikers**: Can only do trails requiring "First-time" experience
- **Some experience**: Can do "First-time" AND "Some experience" trails  
- **Very experienced**: Can do ALL trails (any experience level)

This makes sense because:
- Experienced hikers can easily handle beginner trails
- But beginners shouldn't attempt advanced trails

## Expected Results by Complete Filter Combination

### Beginner Difficulty Examples

#### Beginner + Short + Self-guided + First-time
- **Expected**: Trails 1, 7 (both score 4/4)

#### Beginner + Short + Self-guided + Some experience  
- **Expected**: Trails 1, 7 (both score 4/4)
- **Reasoning**: Experienced hikers can do easier trails

#### Beginner + Short + Self-guided + Very experienced
- **Expected**: Trails 1, 7 (both score 4/4)  
- **Reasoning**: Very experienced hikers can do any trail

### Moderate Difficulty Examples

#### Moderate + Medium + Guided + First-time
- **Expected**: No results
- **Reasoning**: First-time hikers can't do moderate trails

#### Moderate + Medium + Guided + Some experience
- **Expected**: Trails 3, 4 (both score 4/4)

#### Moderate + Medium + Guided + Very experienced  
- **Expected**: Trails 3, 4 (both score 4/4)
- **Reasoning**: Experienced hikers can do moderate trails

### Partial Matches with "Either is fine" Guide Option

#### Beginner + Short + Either + First-time
- **Expected**: Trails 1, 7 (both score 4/4)
- **Reasoning**: "Either is fine" matches both self-guided trails

#### Moderate + Medium + Either + Some experience
- **Expected**: Trails 3, 4 (both score 4/4)
- **Reasoning**: "Either is fine" matches guide-required trails

### No Match Scenarios

#### Beginner + Short + Guided + First-time
- **Expected**: No results
- **Reasoning**: No beginner trails require guides

#### Moderate + Medium + Self-guided + Some experience
- **Expected**: No results  
- **Reasoning**: All moderate trails require guides

#### Challenging + Long + Self-guided + Experienced
- **Expected**: No results
- **Reasoning**: All challenging trails require guides

## Scoring System
- **Maximum Score**: Always 4/4 (all criteria must match)
- **Minimum Requirements**: All 4 filters must be selected
- **Perfect Match**: Trail matches all selected criteria exactly
- **No Partial Matches**: Trails either match completely or don't appear